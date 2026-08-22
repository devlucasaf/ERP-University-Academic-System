package erp.academico.modules.funcionario.model;

import erp.academico.modules.usuario.model.TipoUsuario;

public enum CargoFuncionario {
    COORDENADOR,
    SECRETARIA,
    BIBLIOTECARIO,
    FINANCEIRO,
    ADMIN;

    public TipoUsuario toRoleUsuario() {
        return TipoUsuario.valueOf(this.name());
    }
}

